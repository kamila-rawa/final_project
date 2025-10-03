import { useState, useEffect } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('stats');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [notification, setNotification] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);
    const [isReorderMode, setIsReorderMode] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'opalanie',
        alt_text: '',
        image: null,
        is_active: true
    });

    const categories = {
        all: 'Toutes les catégories',
        opalanie: 'Spray Tan',
        kosmetyki: 'Cosmétiques & Certificats',
        smsy: 'Avis Clients'
    };

    useEffect(() => {
        if (activeTab === 'portfolio') {
            fetchImages();
        }
    }, [activeTab, selectedCategory]);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const url = selectedCategory === 'all' 
                ? '/api/admin/portfolio'
                : `/api/admin/portfolio?category=${selectedCategory}`;
            
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            const data = await response.json();
            setImages(data.data || []);
        } catch (error) {
            showNotification('Erreur lors du chargement', 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('title', formData.title || '');
        data.append('description', formData.description || '');
        data.append('category', formData.category);
        data.append('alt_text', formData.alt_text || '');
        data.append('is_active', formData.is_active ? '1' : '0');
        
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const url = isEditMode 
                ? `/api/admin/portfolio/${currentImage.id}`
                : '/api/admin/portfolio';
            
            if (isEditMode) {
                data.append('_method', 'PUT');
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: data
            });

            const result = await response.json();

            if (result.success) {
                showNotification(
                    isEditMode ? 'Image mise à jour' : 'Image ajoutée',
                    'success'
                );
                fetchImages();
                closeModal();
            } else {
                showNotification('Erreur lors de l\'enregistrement', 'error');
            }
        } catch (error) {
            showNotification('Erreur', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Supprimer cette image ?')) return;

        try {
            const response = await fetch(`/api/admin/portfolio/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            const result = await response.json();
            if (result.success) {
                showNotification('Image supprimée', 'success');
                fetchImages();
            }
        } catch (error) {
            showNotification('Erreur', 'error');
        }
    };

    const toggleActive = async (image) => {
        try {
            const data = new FormData();
            data.append('is_active', image.is_active ? '0' : '1');
            data.append('_method', 'PUT');

            const response = await fetch(`/api/admin/portfolio/${image.id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: data
            });

            const result = await response.json();
            if (result.success) {
                showNotification('Statut mis à jour', 'success');
                fetchImages();
            }
        } catch (error) {
            showNotification('Erreur', 'error');
        }
    };

    const handleDragStart = (e, index) => {
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        if (draggedItem === null || draggedItem === index) return;

        const newImages = [...images];
        const draggedImage = newImages[draggedItem];
        
        newImages.splice(draggedItem, 1);
        newImages.splice(index, 0, draggedImage);
        
        setImages(newImages);
        setDraggedItem(index);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const saveNewOrder = async () => {
        const items = images.map((img, index) => ({
            id: img.id,
            display_order: index + 1
        }));

        try {
            const response = await fetch('/api/admin/portfolio/reorder', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({ items })
            });

            const result = await response.json();
            if (result.success) {
                showNotification('Ordre sauvegardé', 'success');
                setIsReorderMode(false);
                fetchImages();
            }
        } catch (error) {
            showNotification('Erreur', 'error');
        }
    };

    const cancelReorder = () => {
        setIsReorderMode(false);
        fetchImages();
    };

    const openAddModal = () => {
        setIsEditMode(false);
        setCurrentImage(null);
        setPreviewImage(null);
        setFormData({
            title: '',
            description: '',
            category: 'opalanie',
            alt_text: '',
            image: null,
            is_active: true
        });
        setIsModalOpen(true);
    };

    const openEditModal = (image) => {
        setIsEditMode(true);
        setCurrentImage(image);
        setPreviewImage(image.image_url);
        setFormData({
            title: image.title || '',
            description: image.description || '',
            category: image.category,
            alt_text: image.alt_text || '',
            image: null,
            is_active: image.is_active
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setCurrentImage(null);
        setPreviewImage(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            {/* Tabs Navigation */}
            <div className="bg-white border-b mb-6">
                <div className="flex gap-4 px-6">
                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                            activeTab === 'stats'
                                ? 'border-amber-500 text-amber-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Statistiques
                    </button>
                    <button
                        onClick={() => setActiveTab('portfolio')}
                        className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                            activeTab === 'portfolio'
                                ? 'border-amber-500 text-amber-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Portfolio
                    </button>
                </div>
            </div>

            {/* Stats Tab */}
            {activeTab === 'stats' && (
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
                <div className="p-6">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Gestion du Portfolio</h1>
                                <p className="text-gray-600 mt-1">Gérez les images de votre portfolio</p>
                            </div>
                            <div className="flex gap-3">
                                {!isReorderMode ? (
                                    <>
                                        <button
                                            onClick={() => setIsReorderMode(true)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                            disabled={selectedCategory === 'all' || images.length === 0}
                                        >
                                            Réorganiser
                                        </button>
                                        <button
                                            onClick={openAddModal}
                                            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                        >
                                            Ajouter une image
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={cancelReorder}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            onClick={saveNewOrder}
                                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                        >
                                            Sauvegarder l'ordre
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            {Object.entries(categories).map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => !isReorderMode && setSelectedCategory(key)}
                                    disabled={isReorderMode}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        selectedCategory === key
                                            ? 'bg-amber-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    } ${isReorderMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {isReorderMode && (
                            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-blue-800 font-medium">
                                    Mode réorganisation - Glissez-déposez les images
                                </p>
                            </div>
                        )}
                    </div>

                    {notification && (
                        <div className={`mb-6 p-4 rounded-lg ${
                            notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {notification.message}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                        </div>
                    ) : images.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <p className="text-gray-500 text-lg">Aucune image trouvée</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    draggable={isReorderMode}
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDragEnd={handleDragEnd}
                                    className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                                        isReorderMode ? 'cursor-move' : ''
                                    } ${draggedItem === index ? 'opacity-50' : ''}`}
                                >
                                    <div className="relative aspect-square">
                                        {isReorderMode && (
                                            <div className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                                                #{index + 1}
                                            </div>
                                        )}
                                        <img
                                            src={image.image_url}
                                            alt={image.alt_text || image.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                image.is_active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                                            }`}>
                                                {image.is_active ? 'Actif' : 'Inactif'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="mb-3">
                                            <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                                                {categories[image.category]}
                                            </span>
                                        </div>

                                        {image.title && (
                                            <h3 className="font-semibold text-gray-900 mb-1 truncate">
                                                {image.title}
                                            </h3>
                                        )}

                                        {!isReorderMode && (
                                            <div className="flex gap-2 mt-3">
                                                <button
                                                    onClick={() => openEditModal(image)}
                                                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                                                >
                                                    Éditer
                                                </button>
                                                
                                                <button
                                                    onClick={() => toggleActive(image)}
                                                    className="bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-2 rounded-lg transition-colors"
                                                >
                                                    {image.is_active ? '👁️' : '👁️‍🗨️'}
                                                </button>
                                                
                                                <button
                                                    onClick={() => handleDelete(image.id)}
                                                    className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {isEditMode ? 'Modifier l\'image' : 'Ajouter une image'}
                                        </h2>
                                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl">
                                            ✕
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Catégorie
                                            </label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                                            >
                                                <option value="opalanie">Spray Tan</option>
                                                <option value="kosmetyki">Cosmétiques</option>
                                                <option value="smsy">Avis Clients</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            />
                                            {previewImage && (
                                                <img src={previewImage} alt="Aperçu" className="mt-2 max-h-48 rounded-lg" />
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                rows={3}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Texte alternatif</label>
                                            <input
                                                type="text"
                                                value={formData.alt_text}
                                                onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_active"
                                                checked={formData.is_active}
                                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                                className="w-4 h-4 text-amber-500 rounded"
                                            />
                                            <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700">
                                                Image active
                                            </label>
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <button
                                                onClick={closeModal}
                                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold"
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold"
                                            >
                                                {isEditMode ? 'Mettre à jour' : 'Ajouter'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
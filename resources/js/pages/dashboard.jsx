import { useState, useEffect } from 'react';
import { Camera, Package, MessageSquare, Upload, Edit, Trash2, Eye, EyeOff, X } from 'lucide-react';

export default function Dashboard() {
    const [activeCategory, setActiveCategory] = useState('smsy'); // Par défaut "Od Klientek"
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [notification, setNotification] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'opalanie',
        alt_text: '',
        image: null,
        is_active: true
    });

    const categories = [
        {
            id: 'opalanie',
            name: 'Spray Tan',
            icon: Camera,
            color: 'amber'
        },
        {
            id: 'kosmetyki',
            name: 'Kosmetyki & Certyfikaty',
            icon: Package,
            color: 'pink'
        },
        {
            id: 'smsy',
            name: 'Od Klientek',
            icon: MessageSquare,
            color: 'purple'
        }
    ];

    useEffect(() => {
        if (activeCategory) {
            fetchImages();
        }
    }, [activeCategory]);

    const getCsrfToken = () => {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    };

    const fetchImages = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/admin/portfolio?category=${activeCategory}`, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': getCsrfToken()
                }
            });
            
            const data = await response.json();
            setImages(data.data || []);
        } catch (error) {
            showNotification('Błąd podczas ładowania', 'error');
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
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': getCsrfToken()
                },
                body: data
            });

            const result = await response.json();

            if (result.success) {
                showNotification(
                    isEditMode ? 'Zdjęcie zaktualizowane' : 'Zdjęcie dodane',
                    'success'
                );
                fetchImages();
                closeModal();
            } else {
                showNotification('Błąd podczas zapisywania', 'error');
            }
        } catch (error) {
            showNotification('Błąd', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Czy na pewno chcesz usunąć to zdjęcie?')) return;

        try {
            const response = await fetch(`/api/admin/portfolio/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': getCsrfToken()
                }
            });

            const result = await response.json();
            if (result.success) {
                showNotification('Zdjęcie usunięte', 'success');
                fetchImages();
            }
        } catch (error) {
            showNotification('Błąd', 'error');
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
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': getCsrfToken()
                },
                body: data
            });

            const result = await response.json();
            if (result.success) {
                showNotification('Status zaktualizowany', 'success');
                fetchImages();
            }
        } catch (error) {
            showNotification('Błąd', 'error');
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
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': getCsrfToken()
                },
                body: JSON.stringify({ items })
            });

            const result = await response.json();
            if (result.success) {
                showNotification('Kolejność zapisana', 'success');
                setIsReorderMode(false);
                fetchImages();
            }
        } catch (error) {
            showNotification('Błąd', 'error');
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
            category: activeCategory,
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

    const getCategoryColor = (colorName) => {
        const colors = {
            amber: 'bg-amber-500 hover:bg-amber-600',
            pink: 'bg-pink-500 hover:bg-pink-600',
            purple: 'bg-purple-500 hover:bg-purple-600'
        };
        return colors[colorName] || 'bg-gray-500 hover:bg-gray-600';
    };

    const activeCtg = categories.find(c => c.id === activeCategory);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
                    <p className="text-sm text-gray-600 mt-1">Zarządzaj kategoriami</p>
                </div>

                <nav className="flex-1 p-4">
                    <div className="space-y-2">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const isActive = activeCategory === category.id;
                            
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setActiveCategory(category.id);
                                        setIsReorderMode(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                                        isActive
                                            ? `${getCategoryColor(category.color)} text-white shadow-md`
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-left flex-1">{category.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <form method="POST" action="/logout">
                        <input type="hidden" name="_token" value={getCsrfToken()} />
                        <button
                            type="submit"
                            className="w-full mb-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                            Wyloguj się
                        </button>
                    </form>
                    <div className="text-xs text-gray-500 text-center">
                        DWWM Project 2025
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="bg-white border-b border-gray-200 px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{activeCtg?.name}</h2>
                            <p className="text-gray-600 mt-1">
                                {images.length} {images.length === 1 ? 'zdjęcie' : 'zdjęć'}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={openAddModal}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors text-white ${getCategoryColor(activeCtg?.color)}`}
                            >
                                <Upload className="w-5 h-5" />
                                Dodaj zdjęcie
                            </button>
                        </div>
                    </div>
                </div>

                {notification && (
                    <div className={`mx-8 mt-6 p-4 rounded-lg flex items-center gap-3 ${
                        notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        <div className={`w-2 h-2 rounded-full ${
                            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        {notification.message}
                    </div>
                )}

                <div className="flex-1 overflow-auto p-8">
                    {loading ? (
                        <div className="flex justify-center items-center py-24">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500"></div>
                        </div>
                    ) : images.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-24 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
                                {activeCtg && <activeCtg.icon className="w-10 h-10 text-amber-500" />}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Brak zdjęć</h3>
                            <p className="text-gray-500 mb-6">Dodaj pierwsze zdjęcie do tej kategorii</p>
                            <button
                                onClick={openAddModal}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors text-white ${getCategoryColor(activeCtg?.color)}`}
                            >
                                <Upload className="w-5 h-5" />
                                Dodaj zdjęcie
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
                                >
                                    <div className="relative aspect-square">
                                        <img
                                            src={image.image_url}
                                            alt={image.alt_text || image.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                                                image.is_active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                                            }`}>
                                                {image.is_active ? 'Aktywne' : 'Nieaktywne'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        {image.title && (
                                            <h3 className="font-semibold text-gray-900 mb-2 truncate">
                                                {image.title}
                                            </h3>
                                        )}

                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() => openEditModal(image)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2.5 rounded-lg font-medium transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Edytuj
                                            </button>
                                            
                                            <button
                                                onClick={() => toggleActive(image)}
                                                className="bg-gray-50 hover:bg-gray-100 text-gray-600 p-2.5 rounded-lg transition-colors"
                                                title={image.is_active ? 'Dezaktywuj' : 'Aktywuj'}
                                            >
                                                {image.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                            </button>
                                            
                                            <button
                                                onClick={() => handleDelete(image.id)}
                                                className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-lg transition-colors"
                                                title="Usuń"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    {isEditMode ? 'Edytuj zdjęcie' : 'Dodaj nowe zdjęcie'}
                                </h2>
                                <button 
                                    onClick={closeModal} 
                                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Kategoria
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    >
                                        <option value="opalanie">Spray Tan</option>
                                        <option value="kosmetyki">Kosmetyki & Certyfikaty</option>
                                        <option value="smsy">Od Klientek</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Zdjęcie</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    />
                                    {previewImage && (
                                        <img src={previewImage} alt="Podgląd" className="mt-4 max-h-64 rounded-xl shadow-md mx-auto" />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Tytuł</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Opcjonalny tytuł zdjęcia"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Opis</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        placeholder="Opcjonalny opis"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Tekst alternatywny (ALT)</label>
                                    <input
                                        type="text"
                                        value={formData.alt_text}
                                        onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                                        placeholder="Opis dla SEO i dostępności"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                        className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-semibold text-gray-700 cursor-pointer">
                                        Zdjęcie aktywne (widoczne na stronie)
                                    </label>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-semibold transition-colors"
                                    >
                                        Anuluj
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                                    >
                                        {isEditMode ? 'Zaktualizuj' : 'Dodaj zdjęcie'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
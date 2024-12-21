import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { DownloadIcon } from '@heroicons/react/outline';

const Gallery = ({ preview = false }: { preview?: boolean }) => {
  const [images, setImages] = useState<any[]>([]); // Array untuk menyimpan gambar
  const [loading, setLoading] = useState<boolean>(true); // State untuk loading
  const [currentPage, setCurrentPage] = useState<number>(1); // Halaman aktif
  const [imagesPerPage] = useState<number>(9); // Menetapkan jumlah gambar per halaman menjadi 9
  const [showAlert, setShowAlert] = useState(false); // State untuk kontrol alert
  const [selectedImage, setSelectedImage] = useState<string>(''); // State untuk menyimpan URL gambar yang dipilih
  const [isDownloading, setIsDownloading] = useState(false); // State untuk mengetahui apakah proses download sedang berlangsung

  const location = useLocation(); // Mendapatkan lokasi saat ini

  // Fungsi untuk mengambil gambar dari API (back-end)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery'); // Ganti dengan URL API back-end yang sesuai
        const data = await response.json();
        setImages(data); // Set data gambar dari API
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false); // Set loading ke false setelah selesai
      }
    };

    fetchImages();
  }, []);

  const totalImages = images.length;
  const totalPages = Math.ceil(totalImages / imagesPerPage); // Total halaman berdasarkan jumlah gambar dan jumlah per halaman

  // Fungsi untuk mendapatkan gambar yang ditampilkan berdasarkan halaman aktif
  const currentImages = images.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);

  const displayImages = preview ? currentImages.slice(0, 6) : currentImages;

  // Fungsi untuk pindah ke halaman sebelumnya
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll ke atas setelah pindah halaman
    }
  };

  // Fungsi untuk pindah ke halaman berikutnya
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll ke atas setelah pindah halaman
    }
  };

  // Determine if the image is landscape or portrait
  const getImageType = (image: any) => {
    const aspectRatio = image.width / image.height;
    return aspectRatio > 1 ? 'landscape' : 'portrait';
  };

  // Fungsi untuk mengunduh gambar
  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${imageUrl}`; // Support for environment-based URLs
    link.download = imageUrl.split('/').pop() || 'image.jpg'; // Mengambil nama gambar dari URL dan memberikan nama default
    link.click();
  };

  // Fungsi untuk menampilkan konfirmasi sebelum mengunduh gambar
  const confirmDownload = (imageUrl: string) => {
    setSelectedImage(imageUrl); // Menyimpan URL gambar yang dipilih
    setShowAlert(true); // Menampilkan alert
  };

  // Fungsi untuk menutup alert
  const closeAlert = () => {
    setShowAlert(false);
  };

  // Fungsi untuk mengonfirmasi dan mengunduh gambar
  const onConfirmDownload = () => {
    setIsDownloading(true); // Set state isDownloading menjadi true
    handleDownload(selectedImage); // Mengunduh gambar
    setTimeout(() => {
      setIsDownloading(false); // Mengembalikan isDownloading menjadi false setelah beberapa detik
      closeAlert(); // Menutup alert setelah download selesai
    }, 1000); // Waktu animasi yang sesuai untuk efek
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-100 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-black mb-10"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          🎨 Gallery
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((image, index) => {
            const imageType = getImageType(image);

            const gridClasses =
              imageType === 'landscape' ? 'lg:col-span-2' : '';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative group overflow-hidden rounded-lg shadow-lg ${gridClasses}`}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${image.url}`} // Handle environment-based URLs
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDownload(image.url); // Trigger download confirmation
                    }}
                    className="p-3 bg-indigo-600 text-white rounded-full transition cursor-pointer"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <DownloadIcon className="w-6 h-6" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {totalImages > 9 && location.pathname === '/gallery' && (
          <div className="text-center mt-14">
            <button
              onClick={prevPage}
              className="inline-block px-6 py-3 bg-indigo-600 font-bold text-white rounded-lg hover:bg-indigo-700 transition mr-4"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-lg font-semibold">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              className="inline-block px-6 py-3 bg-indigo-600 font-bold text-white rounded-lg hover:bg-indigo-700 transition ml-4"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {preview && (
          <div className="text-center mt-14">
            <Link
              to="/gallery"
              className="inline-block px-5 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
            >
              See All Photos
            </Link>
          </div>
        )}
      </div>

      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full"
          >
            <h3 className="text-lg font-semibold mb-4 text-center">Download Image</h3>
            <p className="text-center mb-6">Do you want to download this image?</p>
            <div className="flex justify-around">
              <button
                onClick={onConfirmDownload}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {isDownloading ? 'Downloading...' : 'Yes'}
              </button>
              <button
                onClick={closeAlert}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;

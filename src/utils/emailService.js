// WhatsApp notification system - opens WhatsApp with pre-filled message

export const sendFranchiseApplicationEmail = async (formData) => {
    try {
        // Admin WhatsApp number from .env
        const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP || '+919360370893';

        // Remove all non-digits for WhatsApp API
        const cleanNumber = adminWhatsApp.replace(/\D/g, '');

        // Create message for WhatsApp
        const message = `🎉 NEW FRANCHISE APPLICATION

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
City: ${formData.city}
Budget: ${formData.budget}
Experience: ${formData.experience || 'Not mentioned'}

Time: ${new Date().toLocaleString()}`;

        // Save to localStorage first
        const existingApps = JSON.parse(localStorage.getItem('franchise_applications') || '[]');
        existingApps.push({
            id: Date.now(),
            ...formData,
            submittedAt: new Date().toLocaleString(),
            status: 'pending'
        });
        localStorage.setItem('franchise_applications', JSON.stringify(existingApps));

        // Open WhatsApp with pre-filled message
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappLink, '_blank');

        console.log('✅ WhatsApp opened with message');

        return {
            success: true,
            message: '✅ Application saved!\n\n📱 WhatsApp is opening...\n\nPlease click "Send" to notify admin'
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            success: false,
            message: 'Error - please open WhatsApp manually'
        };
    }
};

export default { sendFranchiseApplicationEmail };

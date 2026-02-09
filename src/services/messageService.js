import { db, collection, addDoc, serverTimestamp } from './firebase';

// Sanitize and validate input data
const sanitizeInput = (data) => {
  return {
    name: data.name.trim().replace(/[<>]/g, '').substring(0, 100),
    email: data.email.trim().toLowerCase().replace(/[<>]/g, '').substring(0, 100),
    message: data.message.trim().replace(/[<>]/g, '').substring(0, 1000)
  };
};

const validateInput = (data) => {
  const errors = [];
  
  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.push('Invalid email format');
  }
  
  if (!data.message || data.message.length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  
  return errors;
};

export const submitMessage = async (messageData) => {
  try {
    // Sanitize input
    const sanitizedData = sanitizeInput(messageData);
    
    // Validate input
    const validationErrors = validateInput(sanitizedData);
    if (validationErrors.length > 0) {
      return { 
        success: false, 
        error: validationErrors.join(', ') 
      };
    }
    
    const docRef = await addDoc(collection(db, 'messages'), {
      ...sanitizedData,
      timestamp: serverTimestamp(),
      status: 'unread'
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    // Don't expose detailed errors in production
    const errorMessage = import.meta.env.DEV ? error.message : 'Failed to submit message';
    if (import.meta.env.DEV) {
      console.error('Error submitting message:', error);
    }
    return { success: false, error: errorMessage };
  }
};

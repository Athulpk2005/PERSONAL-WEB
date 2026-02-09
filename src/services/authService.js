import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from './firebase';

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Login error:', error);
    }
    
    let errorMessage = 'Login failed';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Invalid credentials';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Invalid credentials';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email format';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Account disabled';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many attempts. Try again later';
        break;
      default:
        errorMessage = 'Login failed';
    }
    
    return { success: false, error: errorMessage };
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Logout error:', error);
    }
    return { success: false, error: 'Logout failed' };
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

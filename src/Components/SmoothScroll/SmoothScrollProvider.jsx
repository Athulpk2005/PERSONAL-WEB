import { LenisContext } from './SmoothScrollContext';
import useLenis, { getLenisInstance } from './useLenis';

export { LenisContext, getLenisInstance };

export const SmoothScrollProvider = ({ children, lenisOptions = {} }) => {
  const lenisRef = useLenis(lenisOptions);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
};

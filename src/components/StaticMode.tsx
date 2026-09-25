"use client";

import { createContext, useContext } from "react";

/* Στη σελίδα εκτύπωσης ενότητας τα βαριά διαδραστικά components (π.χ. Sandpack)
   δείχνουν μόνο τη στατική τους εκδοχή, ώστε να μη φορτώνουν δεκάδες editors. */

const StaticModeContext = createContext(false);

export function StaticModeProvider({ children }: { children: React.ReactNode }) {
  return <StaticModeContext.Provider value={true}>{children}</StaticModeContext.Provider>;
}

export function useStaticMode() {
  return useContext(StaticModeContext);
}

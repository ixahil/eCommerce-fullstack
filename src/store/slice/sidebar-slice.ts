import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

// Export actions
export const { setIsOpen } = sidebarSlice.actions;

// Selectors
export const selectSidebar = (state: { sidebar: SidebarState }) =>
  state.sidebar;

// Export the reducer
export default sidebarSlice;

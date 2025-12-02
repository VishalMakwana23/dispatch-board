# Unassigned Orders View Walkthrough

I have refined the **Unassigned Orders View** to match the Figma design and address specific feedback.

## Changes

### 1. `ViewSwitcher.jsx` (New)
- **Purpose**: A reusable component for the view switching dropdown menu.
- **Features**:
  - Consistent styling across all views.
  - Correct positioning using `anchorOrigin` and `transformOrigin`.
  - Handles navigation via `activeView` and `setActiveView` props.
  - Displays the selected view with bold text and a checked radio button.

### 2. `AdminDashboard.jsx`
- **Fix**: Passed `activeView` and `setActiveView` props to `UnassignedOrdersView` to enable navigation.

### 3. `UnassignedOrdersView.jsx`
- **Refactor**: Replaced the manual dropdown implementation with the `ViewSwitcher` component.
- **Cleanup**: Removed duplicated state and logic.

### 4. `RoutesPanel/index.jsx`
- **Refactor**: Replaced the manual dropdown implementation with the `ViewSwitcher` component.

### 5. `SuccessToast.jsx`
- **Position**: Adjusted to `bottom: 100px` to prevent being cut off.

## Verification
- **Navigation**:
  - Users can now switch between "Routes", "Drivers", and "Unassigned orders" from any view without issues.
  - The dropdown menu no longer jumps around and stays consistently positioned.
- **Styling**:
  - The selected view is correctly highlighted in the dropdown.

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack screenOptions={{
    headerShown:false 
  }}>
    <Stack.Screen name="(tabs)"/> /* on met dans stack.screen Les groupes de navigation comme (tabs) */
    <Stack.Screen name="login"/> // Les écrans principaux indépendants (login, profile, etc.).
    <Stack.Screen name="action-modal" 
    options={{presentation:'modal'}}/> // les ecrans modals Un écran modale est une fenêtre qui s'affiche au-dessus des autres écrans, souvent avec un effet de superposition (comme une pop-up)

  </Stack>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';
//on a definit ces 2 fonctions ici pour les utliser dans les autres files
//comme signIn et signUp lorsque le sign in et sign up est effectue aec sucees on stoke les infos de user dans la memoire locale de l app
// Cette fonction sauvegarde une donnée dans AsyncStorage 
export const setLocalStorage = async (key, value) => {
    
  await AsyncStorage.setItem(key,JSON.stringify (value));
  //key : La clé sous laquelle la donnée sera sauvegardée. (doit être une chaîne de caractères)
  //value : La donnée à sauvegarder (peut être un objet, un tableau, une chaîne, etc
  //JSON.stringify(value) : Si la donnée n’est pas une chaîne de caractères (par exemple, un objet ou un tableau), elle est convertie en chaîne au format JSON pour pouvoir être stockée. 
  //setItem : Sauvegarde la donnée dans AsyncStorage.
  
};

//Cette fonction récupère une donnée depuis AsyncStorage
export const getLocalStorage=async(key)=>{
    const result= await AsyncStorage.getItem(key);

return JSON.parse(result)}

//Exemple d’utilité de stocker les infos de l utlisateurs localement:
//Si l'utilisateur ferme et rouvre l'application, l'application peut utiliser getLocalStorage('userDetail') pour vérifier si un utilisateur est déjà connecté. 
//Cela permet de rediriger directement l'utilisateur vers l'écran principal sans lui demander de se reconnecter.
export const RemoveLocalStorage=async()=>{
    await AsyncStorage.clear();
}
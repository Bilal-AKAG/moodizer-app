import {create} from 'zustand'
import * as SecureStore from 'expo-secure-store'

type ThemeStore={
    theme:'light'|'dark'
    toggletheme:()=>void
    loadtheme:()=>Promise<void>
}

export const userThemeStore=create<ThemeStore>((set,get)=>({
    theme:'light',
    toggletheme:()=>{
        const currentTheme=get().theme;
        const newTheme=currentTheme=='light'?'dark':'light';
        set({theme:newTheme});
        SecureStore.setItemAsync('theme',newTheme)
    },
    loadtheme:async()=>{
      const stored=await SecureStore.getItemAsync('theme');
      if(stored ==='light'||stored ==='dark'){
        set({theme:stored})
      }
    }
}))
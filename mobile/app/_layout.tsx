import { styled } from 'nativewind'
import BlurBg from '../src/assets/bg-luz.png'
import Stripes from '../src/assets/stripes.svg'
import { ImageBackground } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SecureStore from 'expo-secure-store'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { 
  BaiJamjuree_700Bold 
} from '@expo-google-fonts/bai-jamjuree'
import { useEffect, useState } from 'react'

const StyledStripes = styled(Stripes)

export default function layout(){
  //o estado 
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null,
    )

  // Retorna um booleano avisando quando as fonts terminaram de carregar
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  //disparar uma funcao sempre que o valor de uma variavel mudar
  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      setIsAuthenticated(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return(
    <ImageBackground
      source={BlurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />
      
      <Stack screenOptions={
        {headerShown: false,
      contentStyle: {backgroundColor: 'transparent'},
      }
      } >
        <Stack.Screen name="index" redirect={isAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
      </ImageBackground>
  )
}
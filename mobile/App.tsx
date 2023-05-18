import { StatusBar } from 'expo-status-bar'
// eslint-disable-next-line no-unused-vars
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import BlurBg from './src/assets/bg-luz.png'
import Stripes from './src/assets/stripes.svg'
import NLWlogo from './src/assets/nlw-logo.svg'

import { styled } from 'nativewind'
import React from 'react'

const StyledStripes = styled(Stripes)

export default function App() {
  // Retorna um booleano avisando quando as fonts terminaram de carregar
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }
  return (
    <ImageBackground
      source={BlurBg}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NLWlogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-[#bebebf]">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="text-blanck font-alt text-sm uppercase">
            Cadastrar memories
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-[#9e9ea0]">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}

// eslint-disable-next-line no-unused-vars
import { styled } from 'nativewind'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import { api } from '../src/lib/api'
import * as SecureStore from 'expo-secure-store';

import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import Stripes from '../src/assets/stripes.svg'
import NLWlogo from '../src/assets/nlw-logo.svg'

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/4fb661f14acd13b8cd7f',
};

export default function App() {
  const router = useRouter()

  

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '4fb661f14acd13b8cd7f',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    },
    discovery,
  )

    async function handleGithubOAuthCode(code: string){
      const response = await api.post('/register', {
        code,
      })

      const { token } = response.data

      await SecureStore.setItemAsync('token', token)

      router.push('/memories')
    }

  useEffect(() => {
    //console.log(makeRedirectUri({
    //  scheme: 'nlwspacetime'
    //}))

    if (response?.type === 'success'){
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
  }, [response])

  
  return (
    <View
      className=" flex-1 items-center  px-8 py-10"
    >
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
          onPress={() => signInWithGithub()}
        >
          <Text className="text-blanck font-alt text-sm uppercase">
            Cadastrar memories
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-[#9e9ea0]">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  )
}
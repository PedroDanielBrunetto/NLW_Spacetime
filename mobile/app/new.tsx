import { View, Text, Switch, TextInput, ScrollView } from "react-native"
import NLWlogo from '../src/assets/nlw-logo.svg'
import { Link } from "expo-router"
import Icon from '@expo/vector-icons/Feather'
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useState } from "react"

export default function newMemory(){
  const { bottom, top } = useSafeAreaInsets()
  const [isPublic, setIsPublic] = useState(false)

  return(
    <ScrollView className="flex-1 px-8" contentContainerStyle={{paddingBottom: bottom, paddingTop: top}}>
      <View className="mt-4 flex-row items-center justify-between">
        <NLWlogo/>
        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#FFF"/>
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch value={isPublic} 
          onValueChange={setIsPublic}
          trackColor={{false: '#767577', true: '#372560'}}
          thumbColor={isPublic ? '#9b70ea' : '#9e9ea0'}
          />
          <Text className="font-body text-base text-gray-200">Tornar memoria publica</Text>
        </View>
        <TouchableOpacity 
        activeOpacity={0.7}
        className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-gray-900/20">
          <View className="flex-row items-center gap-2">
            <Icon name="image" color="#fff"/>
            <Text className="font-body text-sm text-gray-200">
              Adicionar foto ou video de capa
            </Text>
          </View>
        </TouchableOpacity>
        <TextInput 
        multiline 
        className="p-0 font-body text-lg text-gray-50" 
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre." 
        placeholderTextColor="#56565a"/>

        <TouchableOpacity
          activeOpacity={0.7}
          className="items-center self-end rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="text-blanck font-alt text-sm uppercase">
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Theme } from '../Components/Theme'

export function Intro() {
    return (
        <View style={{ padding: Theme.normalize(20) }}>
            <Text style={{ color: Theme.colors.primary, fontFamily: Theme.fonts.text400, fontSize:Theme.sizes.xl }}>Intro</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
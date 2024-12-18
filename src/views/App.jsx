import React, { useState, useEffect } from 'react'
import { NavBar } from 'antd-mobile'
import { invoke } from '@tauri-apps/api/core'
import { Trans } from 'react-i18next'

import Map from '@/common/map'
import Scene from '@/common/three'
import './App.less'

function App() {
    let map, scene
    useEffect(() => {
        map = new Map({
            id: 'map',
            center: [120, 30],
            zoom: 10
        })
        map.loadMap('gaode')
        map.addEvent('click', (e) => {
            console.log(e.coordinate)
        })
        scene = new Scene({
            dom: 'scene',
        })
        scene.addBox({ width: 100, height: 100, depth: 100 })
        scene.goView({ x: 0, y: 0, z: 0 }, 200)
        return () => {
            map && map.destroy()
            scene && scene.destroy()
        }
    }, [])
    return (
        <main className="container">
            <NavBar
                back={null}
                right={<Trans i18nKey="title" />}
            >猫猫</NavBar>
            <div className="scene" id="map"></div>
            <div className="scene" id="scene"></div>
        </main>
    )
}

export default App

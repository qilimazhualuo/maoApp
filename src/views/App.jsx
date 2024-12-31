import React, { useState, useEffect } from 'react'
import { NavBar, Button, SideBar } from 'antd-mobile'
import { invoke } from '@tauri-apps/api/core'
import { Trans } from 'react-i18next'

import Scene from '@/common/three'
import './App.less'

function App() {
    const [navVisible, setNavVisible] = useState(false)
    let scene
    useEffect(() => {
        scene = new Scene({
            dom: 'scene',
        })
        scene.addBox({ width: 100, height: 100, depth: 100, color: "#fff0ff" })
        scene.goView({ x: 0, y: 0, z: 0 }, 200)
        return () => {
            scene && scene.dispose()
        }
    }, [])
    return (
        <main className="container">
            <NavBar
                back={null}
                right={
                    <>
                        <Button onClick={() => location.reload()}>刷新</Button>
                        <Button
                            onClick={() => setNavVisible(!navVisible)}>
                            <Trans i18nKey="title" />
                        </Button>
                    </>
                }
            >猫猫</NavBar>
            <div className="content">
                <SideBar className={{ sideNav: true, navVisible }} >
                    <SideBar.Item key='1' title="仓库" />
                    <SideBar.Item key='2' title="资源" />
                    <SideBar.Item key='3' title="仓库" />
                </SideBar>
                <div className="scene" id="scene"></div>
            </div>
        </main>
    )
}

export default App

import React, { useState, useEffect } from 'react'
import { Button, Dropdown, Form, Input, Radio, Space } from 'antd-mobile'
import { invoke } from '@tauri-apps/api/core'
import { useTranslation, withTranslation, Trans } from 'react-i18next'

import Map from '@/common/map'

function App() {
    const { t, i18n } = useTranslation()
    const [greetMsg, setGreetMsg] = useState('')
    const [name, setName] = useState('')
    console.log('App render')
    const onFinish = () => {
        invoke('greet', { name }).then((res) => {
            setGreetMsg(res)
        })
    }

    useEffect(() => {
        const map = new Map({
            id: 'map',
            center: [120, 30],
            zoom: 10
        })
        map.loadMap('gaode')
    }, [])

    return (
        <main className="container">
            <Dropdown>
                <Dropdown.Item key="1">
                    <Radio.Group defaultValue="zhcn" onChange={(lang) => i18n.changeLanguage(lang)}>
                        <Space style={{ padding: '16px' }} block>
                            <Radio value="zhcn">中文</Radio>
                            <Radio value="en">英文</Radio>
                        </Space>
                    </Radio.Group>
                </Dropdown.Item>
            </Dropdown>
            <div>{t('title')}</div>
            <Form
                layout="horizontal"
                onFinish={onFinish}
                footer={
                    <Button block type="submit" color="primary" size="large">
                        提交
                    </Button>
                }
            >
                <Form.Header>水平布局表单</Form.Header>
                <Form.Item label="Name">
                    <Input id="greet-input" onChange={(val) => setName(val)} placeholder="Enter a name..." />
                </Form.Item>
            </Form>
            <div>{greetMsg}</div>
            <div style={{ height: '50vh' }} id="map"></div>
        </main>
    )
}

export default App

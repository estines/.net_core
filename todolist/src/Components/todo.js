import React, { Component } from 'react'
import { Input, List } from 'antd'
const Search = Input.Search
const url = "http://localhost:52771/api/"
class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            isSelected: false,
            listItem: []
        }
    }

    componentDidMount() {
        this.fetctData()
    }

    async fetctData() {
        let result = await fetch(url + 'todo')
        let item = await result.json()
        this.setState({ listItem: [...item] })
    }

    async fetchPost() {
        let data = { Name: this.state.text, IsComplete: this.state.isSelected }
        let result = await fetch(url + 'todo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        this.setState({ text: '' })
        this.fetctData()
    }

    onSubmitHandler() {
        if (this.state.text !== '') {
            this.fetchPost()
        }
    }

    async onDeleteHandler(id) {
        await fetch(`${url}todo/${id}`, { method: 'POST' })
        this.fetctData()
    }

    async onEditHandler(id, text) {
        if (text !== '') {
            let data = { Name: text }
            await fetch(`${url}todo/edit/${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            this.fetctData()
        }
    }

    onChangeHandler(event) {
        this.setState({
            text: event.target.value
        })
    }

    render() {
        return (
            <div style={{ width: "600px", margin: "auto" }}>
                <Search
                    placeholder="add todo"
                    size="large"
                    onSearch={() => { this.onSubmitHandler() }}
                    onChange={(e) => { this.onChangeHandler(e) }}
                    enterButton
                />

                <List
                    style={{ marginTop: '15px', height: '300px', overflow:'auto' }}
                    bordered
                    dataSource={this.state.listItem}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Search
                                    placeholder="edit todo"
                                    onSearch={value => { this.onEditHandler(item.id, value) }}
                                    enterButton
                                />,
                                <a onClick={() => { this.onDeleteHandler(item.id) }}>Delete</a>
                            ]}>
                            {item.name}
                        </List.Item>)}
                />
            </div>
        )
    }
}

export default Todo
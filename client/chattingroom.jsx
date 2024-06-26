'use strict'
var React = require('react');

// 채팅 검색 컴포넌트
var SearchChat = React.createClass({
    handleChange(e) {
        this.props.onSearchChange(e.target.value);
    },

    render() {
        return (
            <div>
                {/* 채팅 검색 UI */}
                <input 
                    type="text" 
                    placeholder="Search chat..." 
                    style={{fontSize:"15px"}} 
                    onChange={this.handleChange}
                />
            </div>
        );
    }
});

// 채팅방 목록 컴포넌트
var ChatRoomList = React.createClass({
    getInitialState() {
        return {
            rooms: [] // 채팅방 목록을 저장할 상태
        };
    },

    componentDidMount() {
        // 서버에서 채팅방 목록을 가져옴
        fetch('/api/chatting-room')
            .then(response => response.json())
            .then(data => {
                // 가져온 채팅방 목록을 상태에 저장
                console.log(data);
                this.setState({ rooms: data });
            })
            .catch(error => {
                console.error('Error fetching chat rooms:', error);
            });
    },

    handleRoomClick(roomId) {
        // 부모 컴포넌트로 선택한 채팅방의 id를 전달
        sessionStorage.setItem("roomId", roomId);
        // 정상적으로 roomId 받아온다!
        console.log(roomId);
    },

    render() {
        const filteredRooms = this.state.rooms.filter(room => 
            room.roomname.toLowerCase().includes(this.props.searchText.toLowerCase())
        );

        return (
            <div>
                {/* 채팅방 목록 UI */}
                <h2>전체 채팅방</h2>
                <span className='chatlistWrapper'>
                    {filteredRooms.map(room => (
                        <span
                            className="chatlist" 
                            key={room.roomId} 
                            onClick={() => {
                                this.handleRoomClick(room.roomId);
                                this.props.onRoomSelect(room.roomId);
                            }}
                        >
                            {room.roomname}
                        </span>
                    ))}
                </span>
            </div>
        );
    }
});

module.exports = { SearchChat, ChatRoomList };

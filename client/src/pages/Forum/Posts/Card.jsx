import { useNavigate } from "react-router-dom";
import { AvatarIcon } from "./CardPost";
import { HeartFilled, MessageFilled, } from '@ant-design/icons';
import './Card.css';
import useAuthStore from "@/store/authStore";

export default function Card(props) {

    const { thread } = props;

    const { userProfile } = useAuthStore();

    const navigate = useNavigate();

    const toDetails = () => {
        navigate(thread._id);
    };

    return(
        <div className={userProfile === null ? 'card-container' : 'card-container card-container-active'} onClick={userProfile === null ? ()=>{}:  toDetails}>
            <div className='card-user'>
                <AvatarIcon user={thread.user}/>
            </div>
            <div className="card-content">
                <div className="card-content__title">
                    <p>{thread.title}</p>
                </div>
                <div className="card-content__info">
                    <div className='card-content__info-respuestas'>
                        <MessageFilled />
                        <p>{thread.posts.length}</p>
                        <p>Respuestas</p>
                    </div>
                    <div className='card-content__info-votos'>
                        <HeartFilled />
                        <p>{thread.likes.length}</p>
                        <p>likes</p>
                    </div>
                </div>
            </div>
            <div className="card-status">
                <div className="card-status__estado">
                    <p>{thread.status === 'open' ? 'Abierto' : 'Cerrado'}</p>
                </div>
                <div className="card-status__time">
                    <p>{thread.date.split('T')[0]}</p>
                </div>
            </div>
        </div>
    );
};
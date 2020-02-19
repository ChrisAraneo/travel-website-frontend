import React from 'react';
import Title from '../components/Title';
import ImageGallery from 'react-image-gallery';
import '../styles/index.css';

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: '',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

class TravelPage extends React.Component {

    constructor(props) {
        super(props);
        this.fetchPhotosBase64 = this.fetchPhotosBase64.bind(this);
    }

    state = {
        photos: []
    }

    fetchPhotosBase64() {
        // TODO
    }

    render() {
        const { bundle, selectedTravel } = this.props;
        const { fulltravels } = bundle;
        console.log(fulltravels)
        const travel = fulltravels.find(travel => travel.id_travel === selectedTravel);
        if (!travel) {
            return (
                <div className="box">
                    <Title>Błąd: nie znaleziono odpowiedniej strony podróży</Title>
                </div>
            );
        } else {
            const authorsNames = travel.authors.map((author, index) => {
                if (index < travel.authors.length - 1) {
                    return `${author.firstname} ${author.lastname}, `;
                } else {
                    return `${author.firstname} ${author.lastname}`;
                }
            });

            return (
                <div className="box">
                    <Title>{travel.title}</Title>
                    <h2 className="subtitle is-4">{authorsNames}</h2>
                    <ImageGallery items={this.state.photos} />
                    <h3 className="title is-5">{travel.description}</h3>
                </div>
            );
        }
    }
}

export default TravelPage; 
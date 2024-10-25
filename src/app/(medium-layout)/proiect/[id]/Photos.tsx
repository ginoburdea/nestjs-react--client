import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import './Photos.css'

interface Props {
    photos: string[]
}

export default function Photos({ photos }: Props) {
    if (photos.length <= 2) {
        return (
            <div className="grid grid-cols-2 mb-9">
                {photos.map(photo => (
                    <div key={photo} className="photo-container">
                        <div
                            className="photo"
                            style={{ backgroundImage: `url('${photo}')` }}
                        ></div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <>
            <Slider
                dots
                infinite
                speed={250}
                slidesToShow={2}
                slidesToScroll={1}
                className="mb-8"
            >
                {photos.map(photo => (
                    <div key={photo} className="photo-container">
                        <div
                            className="photo"
                            style={{ backgroundImage: `url('${photo}')` }}
                        ></div>
                    </div>
                ))}
            </Slider>
        </>
    )
}

import ImageGaleryItems from './imageGalleryItems'

const ImageGalery = ({ albums }) => {
  return(
    <div>
      <ImageGaleryItems albums={albums} />
    </div>
  )
}

export default ImageGalery;
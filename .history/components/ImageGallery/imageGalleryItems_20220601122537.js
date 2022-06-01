import Link from "next/link";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useState } from "react";
import { useRouter } from "next/router";
import GalleryItem from "../../pages/album/[slug]";

const ImageGaleryItems = ({ albums }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);


  return(
    <div>
      <ul>
          {albums.map((item) => (
            <li key={item.id}>
              <Link
                href={`/?slug=${item.attributes.slug}`} 
                as={`/album/${item.attributes.slug}`} 
                
              >
                {setSelectedItem(item)}
                {item.attributes.name}
              </Link>
            </li>
          ))}
        </ul>

      <Modal
        centered
        fade={false}
        modalClassName = "wrap_image_modal"
        className="image_slider_modal"
        fullscreen
        size="xl"
        isOpen={!!router.query.slug}
        itemObject= {selectedItem}
      >
        <ModalHeader toggle={() => router.push("/")}>
        </ModalHeader>
        <ModalBody>
          <div>
            <GalleryItem itemDetails = {selectedItem}/>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ImageGaleryItems;
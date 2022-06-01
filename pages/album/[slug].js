import {useRouter} from "next/router";
import { fetchAPI } from "../../lib/api";
import AlbumView from "../../components/AlbumView/index"

const GalleryItem = (itemDetails) => {
  const router = useRouter();
  const { slug } = router.query;

  return(
    <div>
      <AlbumView itemDetails ={itemDetails} slug={slug}/>
    </div>
  )
}

export async function getStaticPaths() {
  const albumsRes = await fetchAPI("/albums", { fields: ["slug"] })

  const paths = albumsRes.data.map((album) => ({
    params: {
      slug: album.attributes.slug,
    },
  }))
  
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const albumsRes = await fetchAPI("/albums", {
    filters: {
      slug: params.slug,
    },
    fields: ['name', 'sub_title', 'slug' ],
    populate: {
      images: {
        fields: ['name', 'url'],
      },
      cover_image: {
        fields: ['name', 'url'],
      },
      defaultCredits: {
        fields: ['credit_type', 'credit_value'],
      },
    },
  })

  return {
    props: {
      // Since our slug should be unique we can use
      // it to find the post with the matching slug,
      // this will be the post we need to render
      album : albumsRes.data[0]
    },
    revalidate: 1,
  };
}

export default GalleryItem;
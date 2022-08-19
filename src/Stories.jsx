import { useGlobalContext } from './context'
import HashLoader from "react-spinners/HashLoader";

const Stories = () => {
    const { hits, isLoading, removePost } = useGlobalContext()
    if (isLoading) {
        return (
            <div className='pagination-btn'>
                
                <HashLoader color={'#15133c' } margin={50} loading={true}  size={90} />
              </div>
        )
    }

    return (
        <>
            <div className="stories-div">
                <h2>Web Devlopment News </h2>
                {hits.map((post) => {
                    const { title, author, objectID, url, num_comments,  } = post
                    return (

                        <div className="card" key={objectID}>
                            <h2>{title}</h2>
                            <p>
                                By <span> {author} </span> | <span>{num_comments}</span> comments
                            </p>
                            <div className="card-button">
                                <a href={url} target="_blank" rel="noreferrer">
                                    Read More
                                </a>
                                <a href="#" onClick={() => removePost(objectID)}>Remove</a>
                            </div>
                        </div>

                    )
                })}
            </div>
        </>

    )
}

export default Stories
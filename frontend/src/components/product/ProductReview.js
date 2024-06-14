export default function ProductReviewList({reviews}){
    return(
        <div class="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map(review=>(
                <div key={review._id} class="review-card my-3">
                     <p class="review_comment h3"> {review.user.name}</p>
                <div class="rating-outer">
                    <div class="rating-inner" style={{width:`${review.rating/5 *100}%`}}></div><span>   Verified Purchase</span>
                     
                </div>
               
                <p class="review_comment  lead">{review.comment}</p>
               

                <hr />
            </div>
                   
            ))}
                
        </div>
    
    )
}
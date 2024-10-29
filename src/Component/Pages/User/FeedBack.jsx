import React, { useEffect, useState } from 'react'
import {
    Box,
    Flex,
    Heading,
    Image,
    Text,
    Button,
    SimpleGrid,
    Stack,
    Grid,
    GridItem,
    Badge,
    useToast,
    Input,
  } from "@chakra-ui/react";
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import EndPoint from '../../Auth/Endpoint';
const FeedBack = ({FeedBack}) => {
const [reviews,setReviews]=useState(new Array())
    useEffect(()=>{
        fetchReview()
      },[FeedBack.carId])

      async function fetchReview() { 
        try {
          const res = await axios.get(`${EndPoint.URL}/users/all-feedback/${FeedBack.carId}`);
          if (res.status === 200) {
            if (Array.isArray(res.data)) {
              setReviews(res.data);
            } else {
              console.error('Expected an array, but received:', typeof res.data);
            }
          } else {
            console.error('Error fetching reviews');
          }
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      }

    const toast=useToast();
    const {user}=useAuth()
    const [rating, setRating] = useState(0); // For rating out of 5
    const [comment, setComment] = useState(''); // For user's comment
  
    const handleRatingClick = (value) => {
      setRating(value);

    };

  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const values={
        carId: FeedBack.carId,
        dealerId: FeedBack.dealerId,
        userId: user.data.user.id,
        rating,
        comment,
      }
      console.log(FeedBack.carId,FeedBack.dealerId);

      // Add your code to send the feedback to your server here
      const res=await axios.post(`${EndPoint.URL}/users/feedback`,values);
      if(res.status===200){
        toast({ title: 'Feedback submitted successfully.', status:'success' });
        setRating(0);
        setComment('');
        fetchReview(    )
      }else{
        toast({ title: 'Error submitting feedback.', status:'error' });
      }

    
    };
  return (
    <>
     <Box>
          <Heading as="h2" size="lg" mb={3}>
            User Reviews
          </Heading>
          <div>
      <h2>Rate and Comment</h2>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <h3 
            key={star}
            style={{
              cursor: 'pointer', display:'inline-block',
              color: rating >= star ? 'gold' : 'gray', 
            }}
            onClick={() => handleRatingClick(star)}
          >
            ★
          </h3>
        ))}
      </div>
      <Input
        value={comment} width={300}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comment here"
        rows="4"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
    {
        reviews ? (
            <>
            <Stack spacing={2} style={{}}>
                {reviews.map((review) => (
                  <Box key={review._id}>
                    <Text fontWeight="bold">{review.username}</Text> 
                    {
                        <span>
                        {Array.from({ length: review.rating }).map((_, index) => (
                          <span key={index-1} style={{ color: 'gold' }}>⭐</span>
                        ))}
                      </span>
                      
                    }
                    <Text color="gray.500">{review.comment}</Text>
                  </Box>
                ))}
  
            </Stack>
            </>
        ) : (
            <>
            <Text>No-One reviews for this car.</Text>
            </>
        )   
    }
          
              
        </Box>
      
    </>
  )
}

export default FeedBack

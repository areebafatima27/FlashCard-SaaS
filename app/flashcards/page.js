'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material"

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Container maxWidth="100vw">
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards?.length > 0 ? (
                    flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent>
                                        <Box sx={{ perspective: "1000px" }}>
                                            {flipped[index] ? (
                                                <Typography variant="h5" component="div">
                                                    {flashcard.back || "No Back Text"}
                                                </Typography>
                                            ) : (
                                                <Typography variant="h5" component="div">
                                                    {flashcard.front || "No Front Text"}
                                                </Typography>
                                            )}
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1">No flashcards available</Typography>
                )}
            </Grid>
        </Container>
    )
}
import { useRef } from "react"
import { Box, TextField, Button } from "@mui/material";
export default function Form({add}) {
    const contentRef = useRef();
    return (
        <form
            onSubmit={
                e => {
                    e.preventDefault()
                    const content = contentRef.current.value;
                    console.log(content)
                    add(content, "Thet Tun")
                    e.currentTarget.reset()
                }
            }

        >
            <Box sx={{ mb: 4, textAlign: "right" }}>
                <TextField
                    inputRef={contentRef}
                    type="text"
                    placeholder="Content"
                    fullWidth
                    multiline
                    sx={{ mb: 1 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                >
                    Post
                </Button>
            </Box>
        </form>
    )
}
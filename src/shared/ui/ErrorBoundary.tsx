import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material'
import type { PropsWithChildren } from 'react'
import { Component } from 'react'

type ErrorBoundaryState = {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: '',
  }

  static getDerivedStateFromError(error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected error'
    return { hasError: true, message }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Container maxWidth="sm">
          <Card variant="outlined" role="alert">
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="overline" color="text.secondary">
                Something went wrong
              </Typography>
              <Typography variant="h4" component="h1">
                We hit a snag.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your tasks are safe on this device. Reload the app to try again.
              </Typography>
              <Typography variant="caption" color="error">
                {this.state.message}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Button variant="contained" onClick={this.handleReload}>
                  Reload app
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    )
  }
}

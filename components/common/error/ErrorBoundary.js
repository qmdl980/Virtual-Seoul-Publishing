import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log("error inf", errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error info somewhere
  }

  render() {
    if (this.state.errorInfo) {
      return <h2>Something went wrong!</h2>;
    }
    return this.props.children;
  }
}

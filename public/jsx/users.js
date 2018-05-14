console.log('React Demo Page');

class Welcome extends React.Component {
    render() {
        return (
            <h1>Hello, React!</h1>
        )
    }
}

const element = <Welcome />;

ReactDOM.render(
    element,
    document.getElementById('root')
);
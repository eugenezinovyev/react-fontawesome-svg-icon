import { VoidFunctionComponent } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import Features from './pages/features/Features';

const App: VoidFunctionComponent = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout/> }>
                <Route index element={ <Home/> }/>
                <Route path="/features" element={ <Features/> }/>
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App;

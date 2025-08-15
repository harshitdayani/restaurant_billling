import { Navbar } from "./components/layout/Navbar";
import { MenuList } from "./components/menu/MenuList";
import { Container } from "./components/common/Container";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Container>
                <h1 className="mb-3 text-2xl font-bold">Restaurant Billing</h1>
                <MenuList />
            </Container>
        </div>
    );
}
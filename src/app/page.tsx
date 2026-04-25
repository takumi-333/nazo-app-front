import { Button } from "./components/ui/Button";
import { Card, CardTitle } from "./components/ui/Card";
import { Modal } from "./components/ui/Modal";
import { StarRating } from "./components/ui/StarRating";

export default function HomePage() {
  return (
    <>
        <Button>Hello World</Button>
        <Card>
            <CardTitle>Title</CardTitle>
        </Card>
        <StarRating></StarRating>
    </>
  );
}
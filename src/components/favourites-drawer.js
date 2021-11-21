import React from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/core";
import { Star } from "react-feather";

export default function FavouritesDrawer({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} leftIcon={Star} onClick={onOpen}>
        Favourites
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Favourites</DrawerHeader>
          <DrawerBody overflowY="auto">{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

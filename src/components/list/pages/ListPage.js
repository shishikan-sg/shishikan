import React from 'react';
import {
  Stack,
  HStack,
  Heading,
  Button,
  Box,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  IconButton,
  Avatar,
} from '@chakra-ui/react';
import { MaxWidthContainer } from '@components/containers';
import { LockIcon, UnlockIcon, AddIcon } from '@chakra-ui/icons';
import { InstantSearch, Configure, connectInfiniteHits } from 'react-instantsearch-dom';
import { searchClient } from '@utils/algolia';
import FoodItemHitsWrapper from '../modules/FoodItemHitsWrapper';
import { getFoodFromList } from '@utils/algolia/filteringRules';
import { useRouter } from 'next/router';
import { IoIosRefresh } from 'react-icons/io';

const FoodItemInfiniteHit = connectInfiniteHits(FoodItemHitsWrapper);

const ListPage = ({ isMine, list }) => {
  const router = useRouter();

  const routeToAddPage = () => {
    router.push(`/add?listId=${list.id}`);
  };

  return (
    <InstantSearch searchClient={searchClient} indexName="food">
      <MaxWidthContainer>
        <Box w="100%" display="flex" justifyContent="center">
          <Stack w="100%" maxW="1000px" spacing="24px" display="flex" justifyContent="center">
            <Heading justifyContent="center" display="flex">
              {list.name}
            </Heading>
            <Box justifyContent="center" display="flex">
              {list.visibility === 'private' ? (
                <Tag size="sm" key="sm" variant="subtle" colorScheme="red">
                  <TagLeftIcon boxSize="12px" as={LockIcon} />
                  <TagLabel>Private</TagLabel>
                </Tag>
              ) : (
                <Tag size="sm" key="sm" variant="subtle" colorScheme="cyan">
                  <TagLeftIcon boxSize="12px" as={UnlockIcon} />
                  <TagLabel>Public</TagLabel>
                </Tag>
              )}
            </Box>

            <Box justifyContent="center" display="flex">
              <Tag size="lg" colorScheme="gray" borderRadius="full">
                <Avatar src={list.user.profileImageUrl.raw} size="xs" name={list.user.name} ml={-1} mr={2} />
                <TagLabel>{list.user.name}</TagLabel>
              </Tag>
            </Box>

            <Text noOfLines={8} align="center">
              {list.description}
            </Text>

            <HStack justifyContent="center" display="flex">
              <Button leftIcon={<AddIcon />} variant="outline" borderRadius="100px" onClick={routeToAddPage}>
                Add
              </Button>

              <IconButton
                aria-label="refresh page"
                icon={<IoIosRefresh />}
                onClick={() => router.reload()}
                variant="outline"
                borderRadius="100px"
              />
            </HStack>

            <Configure filters={getFoodFromList(list.id, list.user?.id)} hitsPerPage={8} />
            <>
              <FoodItemInfiniteHit minHitsPerPage={8} />
            </>
          </Stack>
        </Box>
      </MaxWidthContainer>
    </InstantSearch>
  );
};

export default ListPage;

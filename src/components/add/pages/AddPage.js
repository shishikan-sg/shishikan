import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import api from '@api';
import { FOOD_VERDICT, FOOD_COST } from '@constants/food';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  Stack,
  Textarea,
  RadioGroup,
  Radio,
  HStack,
  Heading,
  Button,
  Box,
  useToast,
  CircularProgress,
} from '@chakra-ui/react';
import { MaxWidthContainer } from '@components/containers';
import GooglePlacesInput from '@components/input/GooglePlacesInput';
import DragNDropInput from '@components/input/DragNDropInput';

const AddPage = ({ listId }) => {
  const router = useRouter();
  const toast = useToast();
  const [myLists, setMyLists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const validationSchema = Yup.object().shape({
    list: Yup.string().required('Required'),
    name: Yup.string()
      .required('Required')
      .min(1, 'A name must be provided')
      .max(140, 'Name too long and exceeds 140 character limit'),
    description: Yup.string().required('Required'),
    categories: Yup.array().required('Required').min(1, 'A category must be provided'),
    tagNames: Yup.array().notRequired(),
    address: Yup.string().required('Required'),
    price: Yup.string().required('Required'),
    verdict: Yup.string().required('Required'),
    images: Yup.array().max(4, 'Only 4 selected images allowed'),
  });

  const formik = useFormik({
    initialValues: {
      list: '',
      name: '',
      description: '',
      categories: [],
      tagNames: [],
      address: '',
      price: '',
      verdict: '',
      images: [],
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleCreateFood(values);
    },
  });

  const handleCreateFood = (values) => {
    const { list, name, description, categories, tagNames, address, price, verdict, images } = values;
    const categoryIds = categories.map((category) => category.value);
    const tags = tagNames.map((tag) => tag.value);
    const coverImage = images[0];
    setIsLoading(true);
    api.lists
      .addFood(list, name, description, categoryIds, tags, address, price, verdict, coverImage, images)
      .then((snapshot) => {
        router.push(`list/${list}`);
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    api.lists.getLists().then((docs) => {
      const myLists = docs.map((myListDoc) => myListDoc.data());
      setMyLists(myLists);
      setPageLoading(false);
      myLists.forEach((list) => {
        if (listId === list.id) {
          formik.setFieldValue('list', listId);
        }
      });
    });

    api.categories.getAll().then((docs) => {
      const categories = docs.map((categoryDoc) => categoryDoc.data());
      setCategories(categories);
    });
  }, []);

  return (
    <MaxWidthContainer>
      <Box w="100%" display="flex" justifyContent="center" as="form" onSubmit={formik.handleSubmit}>
        <Stack w="100%" maxW="800px" spacing="24px">
          <Heading>Add Food Item</Heading>

          <DragNDropInput
            initialImages={null}
            onChange={(selectedImages) => {
              formik.setFieldValue('images', selectedImages);
            }}
            error={formik.touched.images && formik.errors.images ? formik.errors.images : ''}
          />

          <FormControl
            id="list"
            isRequired
            isInvalid={formik.errors.list && formik.touched.list}
            isDisabled={formik.isSubmitting}
          >
            <FormLabel htmlFor="list">For which List?</FormLabel>
            <Select placeholder="Select the list" {...formik.getFieldProps('list')}>
              {myLists.map((listItem) => (
                <option value={listItem.id}>{listItem.name}</option>
              ))}
            </Select>
            <FormErrorMessage>{formik.errors.list}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="name"
            isRequired
            isInvalid={formik.errors.name && formik.touched.name}
            isDisabled={formik.isSubmitting}
          >
            <FormLabel>Name</FormLabel>
            <Input id="name" placeholder="name" {...formik.getFieldProps('name')} />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="description"
            isRequired
            isInvalid={formik.touched.description && formik.errors.description}
            isDisabled={formik.isSubmitting}
          >
            <FormLabel>Description</FormLabel>
            <Textarea id="description" placeholder="description" {...formik.getFieldProps('description')} />
            <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="category"
            isRequired
            isInvalid={formik.touched.categories && formik.errors.categories}
            isDisabled={formik.isSubmitting}
          >
            <FormLabel>Food Category</FormLabel>
            <ReactSelect
              isMulti
              name="categories"
              closeMenuOnSelect={false}
              options={categories.map((category) => ({ value: category.id, label: category.name }))}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(inputValue) => {
                formik.setFieldValue('categories', inputValue);
              }}
            />

            <FormErrorMessage>{formik.errors.categories}</FormErrorMessage>
          </FormControl>

          <FormControl
            as="fieldset"
            id="price"
            isRequired
            isInvalid={formik.touched.price && formik.errors.price}
            isDisabled={formik.isSubmitting}
          >
            <FormLabel as="legend">Affordability</FormLabel>
            <RadioGroup
              defaultValue="2"
              onChange={(value) => {
                formik.setFieldValue('price', value);
              }}
              value={formik.values.price}
            >
              <HStack spacing="24px">
                {Object.entries(FOOD_COST).map((cost) => (
                  <Radio key={cost[1]} id={cost[1]} value={cost[1]}>
                    {cost[0]}
                  </Radio>
                ))}
              </HStack>
            </RadioGroup>

            <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
          </FormControl>

          <FormControl
            as="fieldset"
            id="verdict"
            isRequired
            isInvalid={formik.touched.verdict && formik.errors.verdict}
            isDisabled={formik.isSubmitting}
          >
            <FormLabel as="legend">Verdict</FormLabel>
            <RadioGroup
              onChange={(value) => {
                formik.setFieldValue('verdict', value);
              }}
              value={formik.values.verdict}
            >
              <Stack direction={['column', 'row']} spacing={['10px', '24px']}>
                {Object.entries(FOOD_VERDICT).map((verdict) => (
                  <Radio key={verdict[1]} id={verdict[1]} value={verdict[1]}>
                    {verdict[1]}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            <FormErrorMessage>{formik.errors.verdict}</FormErrorMessage>
          </FormControl>

          <GooglePlacesInput
            label="Address"
            disabled={formik.isSubmitting}
            onChange={(address) => {
              formik.setFieldValue('address', address);
            }}
            required
          />

          <FormControl as="fieldset" id="tags" isDisabled={formik.isSubmitting}>
            <FormLabel as="legend">Tags</FormLabel>
            <CreatableSelect
              isClearable
              onChange={(values) => {
                formik.setFieldValue('tagNames', values);
              }}
              isMulti
            />
          </FormControl>

          <Button type="submit" isLoading={isLoading} isDisabled={formik.isSubmitting}>
            Submit
          </Button>
        </Stack>
      </Box>
    </MaxWidthContainer>
  );
};

export default AddPage;

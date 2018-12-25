import { IFormData, IFormSettings } from './../../components/Form';

const formData:IFormSettings = {
  name: 'thisForm',
  onSubmit: 'submitForm',
  data: {
    name: {
      name: 'name',
      options: [ { label: 'Name', value: false } ],
      type: 'text',
      required: true,
      onChange: 'watchField',
      flex: {
        lg: 12,
        xs: 12
      }
    },
    email: {
      name: 'email',
      options: [ { label: 'Email', value: false } ],
      type: 'email',
      required: true,
      flex: {
        lg: 12,
        xs: 12
      },
      validation: true
    },
    phone: {
      name: 'phone',
      options: [ { label: 'Phone', value: false } ],
      type: 'tel',
      required: true,
      flex: {
        lg: 12,
        xs: 12
      },
      validation: true
    },
    address: {
      name: 'address',
      options: [ { label: 'Address', value: false } ],
      type: 'text',
      required: true,
      flex: {
        lg: 12,
        xs: 12
      }
    },
    city: {
      name: 'city',
      options: [ { label: 'City', value: false } ],
      type: 'text',
      required: true,
      flex: {
        lg: 12,
        xs: 12
      }
    },
    state: {
      name: 'state',
      placeholder: 'Choose a State',
      options: [
        { label: 'Alabama', value: 'AL' }
      ],
      type: 'select',
      required: true,
      flex: {
        lg: 6,
        sm: 6,
        xs: 12
      }
    },
    zipcode: {
      name: 'zipcode',
      options: [ { label: 'Zipcode',
      value: false } ],
      type: 'text',
      required: true,
      flex: {
        lg: 6,
        sm: 6,
        xs: 12
      }
    }
  }
}

export default formData;
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import {User} from './schemas/User'
import {Product} from './schemas/Product'
import {ProductImage} from './schemas/ProductImage'
import {createAuth} from '@keystone-next/auth'
import {withItemData, statelessSessions} from '@keystone-next/keystone/session'

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
      fields: ['name', 'email', 'password']
      //todo add data seeding here
    }
  });

export default withAuth(config({
  // @ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // TODO: Add data seeding here
  },
  lists: createSchema({
    // Schema items go in here
    User,
    Product,
    ProductImage,
  }),
  ui: {
    // show UI for people who passs the test
    isAccessAllowed: ({session}) => {
      // console.log(session);
      return !!session?.data;
    },
  },
  
  session: withItemData(statelessSessions(sessionConfig), {
    user: 'id',

  })
}));

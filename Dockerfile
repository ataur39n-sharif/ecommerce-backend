FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Set the working directory to the src directory
WORKDIR /app/src

# for typescript
RUN npm run build

ENV PORT=9000
ENV MONGO_URI='mongodb+srv://dev:dev-ataur@cluster0.6959uav.mongodb.net/ecom-db?retryWrites=true&w=majority'
ENV NODE_ENV='production'
ENV BCRYPT_SALTROUND=12
ENV JWT_ACCESSTOKEN_SECRET='JWT_ACCESSTOKEN_SECRET'
ENV JWT_ACCESSTOKEN_EXP='12h'
ENV JWT_REFRESHTOKEN_SECRET='JWT_REFRESHTOKEN_SECRET'
ENV JWT_REFRESHTOKEN_EXP='48h'
ENV LOGIN_LINK='http://localhost:3000/login'

WORKDIR /app

EXPOSE 9000
CMD ["node" ,"dist/index.js"]
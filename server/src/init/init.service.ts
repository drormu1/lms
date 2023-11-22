import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Metadata } from '../../../shared/Metadata';

@Injectable()
export class InitService {
  
  getHello(): string {
    return 'Hello World!';
  }

  async init():Promise<Metadata> {
    const metadata : Metadata = {
      userId: undefined,
      subjects: [],
      comments: [],
      
  }
  
  metadata.userId = 'U12345';
  const [sujectsResponse, commentsResponse] = await Promise.all([
      
      axios.get('https://jsonplaceholder.typicode.com/users'),
      axios.get('https://jsonplaceholder.typicode.com/comments'),
    ]);
    metadata.subjects = sujectsResponse.data?.map(u =>  u.name);
    
    metadata.comments = commentsResponse.data; 

    return metadata;

  }

         
}

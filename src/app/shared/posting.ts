import { Price } from './price';
import { PostingLocation } from './postingLocation';
import { OperationType } from './operationType';
import { PostingPrices } from './postingPrices';
import { PostingStatus } from './postingStatus';

export class Posting{
  
        posting_id: string;
        posting_location: PostingLocation;
        posting_prices: PostingPrices[];
        operation_type: OperationType;
        publication_plan:string;
        publish_date:string;
        posting_status: PostingStatus;
        title: string;
        posting_picture:string;
        posting_slug:string;
        posting_description:string;
  
}
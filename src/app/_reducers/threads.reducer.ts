import { Action } from 'redux';
import { Thread } from '../_models/thread.model';
import { ThreadActions } from '../_actions/index';

export interface ThreadsEntities {
  [id: string]: Thread;
}

export interface ThreadsState {
  ids: string[];
  entities: ThreadsEntities;
  currentThreadId?: string;
}

const initialState: ThreadsState = {
  ids: [],
  currentThreadId: null,
  entities: {}
};

export const ThreadsReducer =
  (state: ThreadsState = initialState, action: Action): ThreadsState => {
    switch (action.type) {

      // Adds a new Thread to the list of entities
      case ThreadActions.ADD_THREAD: {
        const thread = (<ThreadActions.AddThreadAction>action).thread;

        if (state.ids.includes(thread.id)) {
          return state;
        }

        return {
          ids: [...state.ids, thread.id],
          currentThreadId: state.currentThreadId,
          entities: Object.assign({}, state.entities, {
            [thread.id]: thread
          })
        };
      }
      /* falls through */

      // Add a new message to a particular Thread
      case ThreadActions.ADD_MESSAGE: {
        const thread = (<ThreadActions.AddMessageAction>action).thread;
        const message = (<ThreadActions.AddMessageAction>action).message;

        // special case: if the message being added is in the current thread, then
        // mark it as read
        const isRead = message.thread.id === state.currentThreadId ?
          true : message.isRead;
        const newMessage = Object.assign({}, message, { isRead: isRead });

        // grab the old thraed from entities
        const oldThread = state.entities[thread.id];

        // create a new thread which has our newMessage
        const newThread = Object.assign({}, oldThread, {
          messages: [...oldThread.messages, newMessage]
        });

        return {
          ids: state.ids, // unchanged
          currentThreadId: state.currentThreadId, // unchanged
          entities: Object.assign({}, state.entities, {
            [thread.id]: newThread
          })
        };
      }
      /* falls through */

      // Select a particular thread in the UI
      case ThreadActions.SELECT_THREAD: {
        const thread = (<ThreadActions.SelectThreadAction>action).thread;
        const oldThread = state.entities[thread.id];

        // mark the messages as read
        const newMessages = oldThread.messages.map(
          (message) => Object.assign({}, message, { isRead: true }));

        // give them to this new thread
        const newThread = Object.assign({}, oldThread, {
          messages: newMessages
        });

        return {
          ids: state.ids,
          currentThreadId: thread.id,
          entities: Object.assign({}, state.entities, {
            [thread.id]: newThread
          })
        };
      }
    }
  };

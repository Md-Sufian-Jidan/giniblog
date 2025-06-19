import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
    const res = await fetch('/api/tags', { method: 'GET' });
    if (!res.ok) throw new Error('Failed to fetch tags');
    return res.json();
});


const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTags.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tags';
            });
    },
});

export default tagsSlice.reducer;

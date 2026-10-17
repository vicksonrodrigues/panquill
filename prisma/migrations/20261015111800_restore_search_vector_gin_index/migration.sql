-- CreateIndex
CREATE INDEX "recipes_search_vector_idx" ON "recipes" USING GIN ("search_vector");

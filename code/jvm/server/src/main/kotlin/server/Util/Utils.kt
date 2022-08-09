package server.Util

class Utils{

    companion object Util {

        /** Function not working - TODO **/
        fun <T> PaginationList(list : Collection<T> , pageNumber : Int, pageSize : Int) : Collection<T>
        {

            for (i in 1..list.size)
            {
                if(i > (pageNumber-1)*pageSize && i < pageSize*pageNumber)
                {
                    list.drop(1)
                }
            }
            return list
        }
    }
}
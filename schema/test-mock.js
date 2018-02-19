let counter = 0;

const mocks = {
    String: () => {
        counter++;
        return counter.toString();
    },
};

export default mocks;
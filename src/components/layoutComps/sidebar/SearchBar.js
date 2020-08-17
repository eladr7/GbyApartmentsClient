import React, { useContext, useState, useRef } from "react"
import '../../../layout/style/style.scss';

import { PaginationContext } from '../../../stores/paginationContext'


const SearchBar = () => {
    const paginationContext = useRef(useContext(PaginationContext));// elad: maybe remove the useRef
    const { minPriceCtx, maxPriceCtx, bedroomsNumCtx, areaCtx } = paginationContext.current.getFilterParams();

    const [minPrice, setMinPrice] = useState(minPriceCtx);
    const [maxPrice, setMaxPrice] = useState(maxPriceCtx);
    const [bedroomsNum, setBedroomsNum] = useState(bedroomsNumCtx);
    const [area, setArea] = useState(areaCtx);

    const applyFilters = (e) => {
        paginationContext.current.setFilterContext(minPrice, maxPrice, bedroomsNum, area);
    }

    const resetFilters = (e) => {
        setMinPrice('0');
        setMaxPrice('0');
        setBedroomsNum('');
        setArea('');
        paginationContext.current.resetFilters();
    }

    return (
        <div className="site-card">
            <div className="title">
                <h3 className="header">Filter</h3>
            </div>
            <div className="filters">
                <div className="price">
                    <label>Price</label>
                    <div className="d-flex">
                        <input type="number" min="800" max="1500" step="100"
                            value={minPrice}
                            onChange={e => {
                                if (parseInt(e.target.value, 10) > parseInt(maxPrice, 10)) {
                                    setMaxPrice(e.target.value)
                                }

                                setMinPrice(e.target.value)
                            }}
                            placeholder="min" className="min-price"
                        />
                        <input type="number" min="800" max="1500" step="100"
                            value={maxPrice}
                            onChange={e => {
                                if (parseInt(e.target.value, 10) < parseInt(minPrice, 10)) {
                                    setMaxPrice(minPrice)
                                } else {
                                    setMaxPrice(e.target.value)
                                }
                            }}
                            placeholder="max"
                        />
                    </div>
                </div>
                <div className="bedrooms">
                    <label>Bedrooms</label>
                    <select onChange={e => setBedroomsNum(e.target.value)} value={bedroomsNum}>
                        <option value=''> </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="meterage">
                    <label>Apartment area</label>
                    <select onChange={e => setArea(e.target.value)} value={area}>
                        <option value=''> </option>
                        <option value="30-40">30-40</option>
                        <option value="41-50">41-50</option>
                        <option value="51-60">51-60</option>
                        <option value="61-70">61-70</option>
                        <option value="71-80">71-80</option>
                        <option value="81-90">81-90</option>
                        <option value="91-100">91-100</option>
                    </select>
                </div>
                <div className="d-flex">
                    <button className="apply-filters-button" onClick={applyFilters}>Apply</button>
                    <button onClick={resetFilters}>Reset filters</button>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;